const tags = [];

class Tag {
  constructor(name) {
    // create new tag
    this.name = name;

    tags.push(this);
  }

  static list() {
    return tags;
  }

  static edit(oldTag, newTag) {
    const newTags = tags.map(tag => {
      if (tag === oldTag) {
        return newTag;
      }

      return tag;
    });

    tags.splice(0, tags.length);
    tags.push(...newTags);
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

    tags.splice(0, tags.length);
    tags.push(...newTags);
  }
}

module.exports = Tag;