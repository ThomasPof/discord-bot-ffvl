module.exports = {
  name: "delete_from_category",
  description: "Supprime tous les salons d'une catégorie",
  deferred: true,
  ephemeral: true,
  options: [
    {
      name: "category",
      description: "Nom de la catégorie",
      type: "STRING",
      required: true,
    }
  ],
  async execute(interaction) {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.editReply({ content: "Commande réservée aux administrateurs." });
    }

    const categoryName = interaction.options.getString('category');
    const guild = interaction.guild;

    const category = guild.channels.cache.find(
      ch => ch.type === "GUILD_CATEGORY" && ch.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category) {
      return interaction.editReply({ content: `Catégorie "${categoryName}" introuvable.` });
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

    return interaction.editReply({ content: `✅ ${deleted} salon(s) supprimé(s) de la catégorie "${categoryName}".` });
  },
};
