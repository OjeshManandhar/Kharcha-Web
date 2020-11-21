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
    res.render(_path('add'), { title: 'Add Tags' });
  },
  list: (req, res) => {
    // console.log(
    //   Tags.getExistingTags('qw er, asdf   , qwe  , QWE, asd, qwer rty, 123'),
    //   Tags.getExistingTags(''),
    //   Tags.getExistingTags('123')
    // );

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
    res.render(_path('delete'), { title: 'Delete Tags' });
  }
};

// POST
module.exports.post = {
  add: (req, res) => {
    const saved = Tags.add(req.body.tag);

    console.log(`${req.body.tag} is ${saved ? 'saved' : 'not saved'}`);

    res.redirect('/tags');
  },
  search: (req, res) => {
    console.log('search tag:', req.body.tag);

    const foundTags = Tags.search(req.body.tag);

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
    const deleted = Tags.delete(req.body.tag);

    console.log(`${req.body.tag} is ${deleted ? 'deleted' : 'not deleted'}`);

    res.redirect('/tags');
  }
};
