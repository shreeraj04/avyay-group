export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  coverImage
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  coverImage,
  body
}`

export const recentPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0..2] {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  coverImage
}`

export const videosQuery = `*[_type == "video"] | order(publishedAt desc) {
  _id,
  title,
  youtubeUrl,
  description,
  thumbnail,
  category,
  publishedAt
}`

export const teamQuery = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  qualifications,
  photo,
  bio,
  linkedIn,
  email,
  phone
}`

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  name,
  tagline,
  logo,
  color,
  features
}`
