// models
const Tags = require('./../models/tag');

// utils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('tags', ...args);
}

// GET
module.exports.get = {
  index: (req, res) => {
    res.render(_path('index'), { title: 'Tags' });
  },
  add: (req, res) => {
    res.render(_path('add'), { title: 'Add Tag' });
  },
  list: (req, res) => {
    res.render(_path('list'), {
      title: 'List Tags',
      backLink: '/tags',
      tags: Tags.list()
    });
  },
  search: (req, res) => {
    res.render(_path('search'), { title: 'Search Tags' });
  },
  edit: (req, res) => {
    res.render(_path('edit'), { title: 'Edit Tag' });
  },
  delete: (req, res) => {
    res.render(_path('delete'), { title: 'Delete Tag' });
  }
};

// POST
module.exports.post = {
  add: (req, res) => {
    const tag = req.body.tag;

    const saved = Tags.save(tag);

    console.log(`${tag} is ${saved ? 'saved' : 'not saved'}`);

    res.redirect('/tags');
  },
  search: (req, res) => {
    const tag = req.body.tag;
    console.log('search tag:', tag);

    const foundTags = Tags.search(tag);

    if (foundTags.length) {
      res.render(_path('list'), {
        title: 'List Tags',
        backLink: '/tags/search',
        tags: foundTags
      });
    } else {
      res.redirect('/tags');
    }
  },
  edit: (req, res) => {
    const oldTag = req.body['old-tag'];
    const newTag = req.body['new-tag'];

    const edited = Tags.edit(oldTag, newTag);

    console.log('edit tag:', oldTag, newTag, edited);

    res.redirect('/tags');
  },
  delete: (req, res) => {
    const tag = req.body.tag;

    const deleted = Tags.delete(tag);

    console.log(`${tag} is ${deleted ? 'deleted' : 'not deleted'}`);

    res.redirect('/tags');
  }
};
