// packages
const { Op } = require('sequelize');

// models
const Tag = require('./../models/tag');

// utils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('tags', ...args);
}

// GET
module.exports.get = {
  index: (req, res) => {
    res.render(_path('index'), { title: 'Tag' });
  },
  add: (req, res) => {
    res.render(_path('add'), { title: 'Add Tag' });
  },
  list: (req, res) => {
    req.user
      .getTags()
      .then(tags => {
        res.render(_path('list'), {
          title: 'List Tag',
          backLink: '/tags',
          tags: tags.map(t => t.tag).reverse()
        });
      })
      .catch(err => console.log('uesr.getTags err:', err));
  },
  search: (req, res) => {
    res.render(_path('search'), { title: 'Search Tag' });
  },
  edit: (req, res) => {
    res.render(_path('edit'), { title: 'Edit Tag' });
  },
  delete: (req, res) => {
    res.render(_path('delete'), { title: 'Delete Tags' });
  }
};

// POST
module.exports.post = {
  add: (req, res) => {
    const list = req.body.tag.split(',').map(tag => tag.trim());

    req.user
      .getTags()
      .then(tags => {
        const tagsToAdd = [];

        const allTagsInvalid = list.every(tag => tag.length < 3);
        if (allTagsInvalid) return Promise.resolve(null);

        list.forEach(tag => {
          if (tag.length < 3) return;

          const found = tags.find(
            t => t.tag.toLowerCase() === tag.toLowerCase()
          );

          if (!found)
            tagsToAdd.push({
              tag: tag,
              userId: req.user.id
            });
        });

        return Promise.resolve(tagsToAdd);
      })
      .then(tagsToAdd => {
        if (!tagsToAdd) {
          res.redirect('/message?message=No valid tag(s)&backLink=/tags/add');
        } else if (tagsToAdd.length === 0) {
          res.redirect(
            '/message?message=Tag(s) already exist&backLink=/tags/add'
          );
        } else {
          Tag.bulkCreate(tagsToAdd)
            .then(() => {
              res.redirect('/message?message=Tag(s) added&backLink=/tags');
            })
            .catch(err => {
              console.log('create tag err:', err);
              res.redirect(
                "/message?message=Couldn't add tags&backLink=/tags/add"
              );
            });
        }
      })
      .catch(err => console.log('uesr.getTags err:', err));
  },
  search: (req, res) => {
    const tagToSearch = req.body.tag;

    req.user
      .getTags({
        where: {
          tag: {
            [Op.like]: `%${tagToSearch}%`
          }
        }
      })
      .then(tags => {
        if (tags.length > 0) {
          res.render(_path('list'), {
            title: 'Search Tag',
            backLink: '/tags',
            tags: tags
              .map(t => {
                const regex = new RegExp(`(${tagToSearch})`, 'ig');

                return t.tag.replace(regex, '<strong>$1</strong>');
              })
              .reverse()
          });
        } else {
          res.redirect('/message?message=No tags found&backLink=/tags/search');
        }
      })
      .catch(err => console.log('uesr.getTags err:', err));
  },
  edit: (req, res) => {
    const oldTag = req.body['old-tag'];
    const newTag = req.body['new-tag'];

    if (oldTag.toLoqweCase() === newTag.toLoqweCase()) {
      res.redirect(
        '/message?message=Old tag and New tag are same&backLink=/tags/edit'
      );

      return;
    }

    // check for new Tag
    req.user
      .getTags({
        where: {
          tag: newTag
        }
      })
      .then(tags => {
        if (tags.length !== 0) {
          // New tag exist
          res.redirect(
            '/message?message=New tag already exists&backLink=/tags/edit'
          );
        } else {
          /**
           * New tag doesn't exist
           * Search for oldTag
           */
          return req.user.getTags({
            where: {
              tag: oldTag
            }
          });
        }
      })
      .then(tags => {
        if (tags.length === 0) {
          // Old tag exist
          res.redirect(
            '/message?message=Old tag not found&backLink=/tags/edit'
          );
        } else {
          const tag = tags[0];
          tag.tag = newTag;

          return tag.save();
        }
      })
      .then(() => {
        res.redirect('/message?message=Tag Edited&backLink=/tags');
      })
      .catch(err => console.log('uesr.getTags err:', err));
  },
  delete: (req, res) => {
    const deleted = Tag.delete(req.body.tag);
    const message = deleted ? 'Tag deleted' : "Tag doesn't exists";
    const backLink = deleted ? '/tags' : '/tags/delete';

    res.redirect(`/message?message=${message}&backLink=${backLink}`);
  }
};
