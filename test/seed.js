export default function seed(models) {
  return models.User.create({
    firstName: 'Aaron',
    lastName: 'McCool'
  })
}