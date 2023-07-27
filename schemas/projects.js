import {defineField, defineType} from 'sanity'

// Custom validation function to limit the number of entries to 4
function maxEntriesValidation(docs) {
  return docs.length <= 4 || 'You can only add a maximum of 4 entries.';
}
// Custom validation function to count words for the description field
function wordCountValidation(description) {
  const wordCount = description.trim().split(/\s+/).length
  if (wordCount < 10 || wordCount > 20) {
    return 'Description must be between 10 and 20 words.'
  }
  return true
}

export default defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required.'),
    }),

    /* Image File */
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    /* Add description */
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) =>
        Rule.required().custom((description) => wordCountValidation(description)),
    }),
  ],
})
