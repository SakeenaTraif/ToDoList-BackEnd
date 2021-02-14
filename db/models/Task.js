const SequelizeSlugify = require("sequelize-slugify");

module.exports =(sequelize,DataTypes) => {
    const Task=  sequelize.define("Task",{
        name: { type: DataTypes.STRING , allowNull: false },
        slug: { type: DataTypes.STRING ,  unique: true},
        status: { type: DataTypes.BOOLEAN , defaultValue: false },
        proiority: { type: DataTypes.STRING, defaultValue: "low"},
        deadlineDate: { type: DataTypes.STRING },
    });

    SequelizeSlugify.slugifyModel(Task, {
        source: ["name"]
      });

    return Task;
};