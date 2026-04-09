module.exports = {
  name: "delete_from_category",
  description: "Supprime tous les salons d'une catégorie",
  options: [
    {
      name: "category",
      description: "Nom de la catégorie",
      type: "STRING",
      required: true,
    }
  ],
  async execute(interaction) {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return;

    const categoryName = interaction.options.getString('category');
    const guild = interaction.guild;

    const category = guild.channels.cache.find(
      ch => ch.type === "GUILD_CATEGORY" && ch.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category) {
      return interaction.reply({ content: `Catégorie "${categoryName}" introuvable.`, ephemeral: true });
    }

    const channels = guild.channels.cache
      .filter(ch => ch.parentId === category.id)
      .map(ch => ch);
    let deleted = 0;

    for (const channel of channels) {
      try {
        await channel.delete();
        deleted++;
      } catch (error) {
        console.error(`Erreur lors de la suppression de ${channel.name}:`, error);
      }
    }

    console.log(`✅ ${deleted} salon(s) supprimé(s) de la catégorie "${categoryName}".`);
  },
};
