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
    // console.log(
    //   Tag.getExistingTags('qw er, asdf   , qwe  , QWE, asd, qwer rty, 123'),
    //   Tag.getExistingTags(''),
    //   Tag.getExistingTags('123')
    // );

    res.render(_path('list'), {
      title: 'List Tag',
      backLink: '/tags',
      tags: Tag.list()
    });
  },
  search: (req, res) => {
    res.render(_path('search'), { title: 'Search Tag' });
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
    const saved = Tag.add(req.body.tag);

    console.log(`${req.body.tag} is ${saved ? 'saved' : 'not saved'}`);

    res.redirect('/tags');
  },
  search: (req, res) => {
    console.log('search tag:', req.body.tag);

    const foundTags = Tag.search(req.body.tag);

    if (foundTags.length) {
      res.render(_path('list'), {
        title: 'List Tag',
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

    const edited = Tag.edit(oldTag, newTag);

    console.log('edit tag:', oldTag, newTag, edited);

    res.redirect('/tags');
  },
  delete: (req, res) => {
    const deleted = Tag.delete(req.body.tag);

    console.log(`${req.body.tag} is ${deleted ? 'deleted' : 'not deleted'}`);

    res.redirect('/tags');
  }
};
