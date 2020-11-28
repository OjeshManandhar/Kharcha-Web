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
          tags: tags.map(tag => tag.tag).reverse()
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

          const found = tags.find(t => t.tag === tag);

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
    const foundTags = Tag.search(req.body.tag);

    if (foundTags.length) {
      res.render(_path('list'), {
        title: 'List Tag',
        backLink: '/tags/search',
        tags: foundTags
      });
    } else {
      res.redirect('/message?message=No tags found&backLink=/tags/search');
    }
  },
  edit: (req, res) => {
    const edited = Tag.edit(req.body['old-tag'], req.body['new-tag']);

    const message =
      edited == null
        ? 'New tag already exists'
        : edited
        ? 'Tag edited'
        : 'Old tag not found';

    const backLink = edited ? '/tags' : '/tags/edit';

    res.redirect(`/message?message=${message}&backLink=${backLink}`);
  },
  delete: (req, res) => {
    const deleted = Tag.delete(req.body.tag);
    const message = deleted ? 'Tag deleted' : "Tag doesn't exists";
    const backLink = deleted ? '/tags' : '/tags/delete';

    res.redirect(`/message?message=${message}&backLink=${backLink}`);
  }
};
