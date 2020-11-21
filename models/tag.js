const tags = ['qwe', 'asd', 'zxc', 'qwer', 'QWE', 'QWER', 'qwer rty'];

class Tag {
  static add(tagsList) {
    const list = tagsList.split(',').map(tag => tag.trim());

    let added = false;
    list.forEach(tag => {
      const found = tags.find(t => t === tag);

      if (!found) {
        tags.push(tag);
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

    let edited = false;
    const newTags = tags.map(tag => {
      if (tag === oldTag) {
        edited = true;
        return newTag;
      }

      return tag;
    });

    tags.splice(0, tags.length);
    tags.push(...newTags);

    return edited;
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
    const list = tagsList.split(',').map(tag => tag.trim());

    let newTags = [...tags];

    list.forEach(tag => {
      newTags = newTags.filter(t => t !== tag);
    });

    if (newTags.length < tags.length) {
      tags.splice(0, tags.length);
      tags.push(...newTags);

      return true;
    }

    return false;
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
