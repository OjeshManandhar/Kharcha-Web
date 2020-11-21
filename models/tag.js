const tags = ['qwe', 'asd', 'zxc', 'qwer', 'QWE', 'QWER', 'qwer rty'];

class Tag {
  static add(tagsList) {
    const list = tagsList.split(',').map(tag => tag.trim());

    let added = false;
    list.forEach(tag => {
      const found = tags.find(t => t === tag);

      if (!found) {
        tags.unshift(tag);
        added = true;
      }
    });

    return added;
  }

  static list() {
    return tags;
  }

  static edit(oldTag, newTag) {
    /**
     * Return values denote following
     * null => newTag already exists
     * true => oldTag is replaced by newTag
     * false => oldTag not found
     */

    // Check if newTag already exists
    const found = tags.find(tag => tag === newTag);
    if (found) {
      return null;
    }

    const oldTagIndex = tags.findIndex(tag => tag === oldTag);

    if (oldTagIndex !== -1) {
      tags[oldTagIndex] = newTag;
      return true;
    } else {
      return false;
    }
  }

  static search(name) {
    const foundTags = [];

    tags.forEach(tag => {
      if (tag.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
        foundTags.push(tag);
      }
    });

    return foundTags;
  }

  static delete(tagsList) {
    let deleted = false;
    const list = tagsList.split(',').map(tag => tag.trim());

    list.forEach(tag => {
      const index = tags.findIndex(t => t === tag);

      if (index !== -1) {
        deleted = true;
        tags.splice(index, 1);
      }
    });

    return deleted;
  }

  static getExistingTags(tagsList) {
    if (tagsList === '') {
      return [];
    }

    const list = tagsList.split(',').map(tag => tag.trim());
    const foundTags = [];

    list.forEach(tag => {
      const found = tags.find(t => t === tag);

      if (found) foundTags.push(tag);
    });

    return foundTags;
  }
}

module.exports = Tag;
