exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.text("image");
  table.text("name");
  table.enum("category", ["Refeição", "Sobremesa", "Bebida"], {useNative: true, enumName: "categories"})
    .notNullable().default("Refeição");
  table.text("price");
  table.text("description");
});

exports.down = knex => knex.schema.dropTable("dishes");
