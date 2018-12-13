export default {
  Query: {
    tasks: (parent, args, { db }) => db.tasks.findAll(),
    task: (parent, { title }, { db }) => db.tasks.findOne({
      where: {
        title
      }
    }),
  },
  Mutation: {
    createTask: (parent, { title, content }, { db }) => {
      return db.tasks.create({
        title,
        content,
      });
    },
    updateTask: (parent, { title, content, id }, { db }) => {
      return db.tasks.update({
        title,
        content,
      },
      {
        where: {
          id,
        },
      });
    },
    deleteTask: (parent, { id }, { db }) => {
      return db.tasks.destroy({
        where: {
          id,
        },
      });
    },
  },
};
