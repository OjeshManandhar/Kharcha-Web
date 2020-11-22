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
    res.render(_path('delete'), { title: 'Delete Tags' });
  }
};

// POST
module.exports.post = {
  add: (req, res) => {
    const saved = Tag.add(req.body.tag);
    const message = saved ? 'Tag added' : 'Tag already exists';
    const backLink = saved ? '/tags' : '/tags/add';

    res.redirect(`/message?message=${message}&backLink=${backLink}`);
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
