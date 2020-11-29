// packages
const { Sequelize, Op } = require('sequelize');

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
          tags: tags.map(t => t.name).reverse()
        });
      })
      .catch(err => console.log('user.getTags err:', err));
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

        const allTagsInvalid = list.every(
          tag => tag.length < 3 || tag.length > 20
        );
        if (allTagsInvalid) return Promise.resolve(undefined);

        list.forEach(tag => {
          // Skip invalid tag
          if (tag.length < 3 || tag.length > 20) return;

          const found =
            // Find tags that already exist in DB
            tags.find(t => t.name.toLowerCase() === tag.toLowerCase()) ||
            /**
             * Find tags that already exist in list of tags to add
             * i.e. to remove multiple occurance of same tag
             */
            tagsToAdd.find(t => t.name.toLowerCase() === tag.toLowerCase());

          if (!found)
            tagsToAdd.push({
              name: tag,
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
      .catch(err => console.log('user.getTags err:', err));
  },
  search: (req, res) => {
    const tagToSearch = req.body.tag;

    req.user
      .getTags({
        where: {
          name: {
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

                return t.name.replace(regex, '<strong>$1</strong>');
              })
              .reverse()
          });
        } else {
          res.redirect('/message?message=No tags found&backLink=/tags/search');
        }
      })
      .catch(err => console.log('user.getTags err:', err));
  },
  edit: (req, res) => {
    const oldTag = req.body['old-tag'];
    const newTag = req.body['new-tag'];

    if (oldTag === newTag) {
      return res.redirect(
        '/message?message=Old tag and New tag are same&backLink=/tags/edit'
      );
    }

    // check for new Tag
    req.user
      .getTags({
        // Case sensitive search using LIKE
        where: Sequelize.where(Sequelize.col('name'), 'LIKE BINARY', newTag)
      })
      .then(tags => {
        if (tags && tags.length !== 0) {
          // New tag exist
          return res.redirect(
            '/message?message=New tag already exists&backLink=/tags/edit'
          );
        }

        /**
         * New tag doesn't exist
         * Search for oldTag
         */
        req.user
          .getTags({
            // Case sensitive search using LIKE
            where: Sequelize.where(Sequelize.col('name'), 'LIKE BINARY', oldTag)
          })
          .then(tags => {
            if (tags && tags.length === 0) {
              // Old tag doesn't exist
              res.redirect(
                '/message?message=Old tag not found&backLink=/tags/edit'
              );

              return undefined;
            }

            // Edit tag and save in DB
            const tag = tags[0];
            tag.name = newTag;

            return tag.save();
          })
          .then(tag => {
            tag && res.redirect('/message?message=Tag Edited&backLink=/tags');
          })
          .catch(err => console.log('user.getTags new err:', err));
      })
      .catch(err => console.log('user.getTags new err:', err));
  },
  delete: (req, res) => {
    const list = req.body.tag.split(',').map(tag => tag.trim());

    Tag.destroy({
      where: {
        userId: req.user.id,
        name: {
          [Op.in]: list
        }
      }
    })
      .then(noOfDeletedTags => {
        console.log('noOfDeletedTags:', noOfDeletedTags);

        if (noOfDeletedTags === 0) {
          return res.redirect(
            "/message?message=Tag(s) doesn't exists&backLink=/tags/delete"
          );
        }

        res.redirect('/message?message=Tag(s) deleted&backLink=/tags');
      })
      .catch(err => console.log('Tag.destroy err:', err));
  }
};
