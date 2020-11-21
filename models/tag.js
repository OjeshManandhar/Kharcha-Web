const tags = [];

class Tag {
  static save(name) {
    const found = tags.find(tag => tag === name);

    if (found) {
      return false;
    } else {
      tags.push(name);
      return true;
    }
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
      if (tag.lowercase().indexOf(name.lowercase()) !== -1) {
        foundTags.push(tag);
      }
    });

    return foundTags;
  }

  static delete(name) {
    const newTags = tags.filter(tag => tag !== name);

    if (newTags.length < tags.length) {
      tags.splice(0, tags.length);
      tags.push(...newTags);

      return true;
    }

    return false;
  }
}

module.exports = Tag;
