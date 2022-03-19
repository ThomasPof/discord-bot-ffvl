// Commands licence
module.exports.TRANSLATION_LICENCE = {
  description: () => "Vérification du numéro de licence FFVL",
  commandDescription: () => "Renseignez votre numéro de licence FFVL pour rejoindre le discord des Z'éléph",
  alreadyValidDescription: (year) =>
    `
    Ta licence ${year} est déjà validée, tout est bon pour cette année.

    Bon vols !
    `,
  successRenewMessage: (year) =>
    `
    🐘 Ta licence ${year} a été validée !

    Content de te retrouver aux Z\'éléph encore cette année !
    `,
  successNewMessage: (year) =>
    `
    🐘 Bienvenue aux Z\'éléph !

    Ta licence ${year} a été validée, tu as maintenant accès aux salons réservés aux membres du club.
    `,
  failureClub: () =>
    `😱 Cette licence n\'est pas connue des Z\'éléph!

    Mais pas de panique, rapproche toi d'un membre du comité pour que ton inscription soit prise en compte.

    En attendant, tu as quand même accès aux salons de base.
    `,
  failureList: (year) =>
    `😱 On dirait que ta licence n'est pas dans la liste de ${year}.

      Pas de panique, tu conserves tes accès Discord pour le moment.

      Rapproche toi rapidement d'un des membres du comité pour régler ça et ne pas perdre tes accès aux salons Discord.
    `,
}

// Commands clean licence
module.exports.TRANSLATION_LICENCE_CLEAN = {
  description: () => "⚠️ Suppression du rôle \"Membre Zéléh\" pour TOUS les membres n\\'ayant pas renouvelé leur licence'",
  successMessage: () =>
    `
    Les membres n'ayant pas renouvelés leur licences vont voir leur rôle "Membre Z'éléph" retiré.
    `,
}

// Events New Member
module.exports.TRANSLATION_NEW_MEMBER= {
  welcome: (member) => `
        Bienvenue ${member} sur le Discord du club des Z'éléphants Volants !

        Ce discord est là pour nous permettre d'échanger des infos, de planifier des sorties et événements, de finaliser leurs organisations opérationnelles, et d'en faire le compte-rendu.

        Afin de faciliter l'organisation et la lisibilité, **il est souhaité que les pseudo affichés sur discord soient les vrais prénoms et la première lettre du nom (au moins)**. Cela peut être paramétré pour le serveur des z'éléphants volants dans votre profil serveur.

        Si tu n'es pas membre du club des Z'éléphants Volants, ton accès au serveur est limité à quelques salons. **Pour avoir un accès complet au serveur, tu dois faire valider ta licence FFVL à notre robot.** Il suffit de taper le message **/licence** dans un salon et de renseigner ton numéro de licence FFVL.

        Tu es nouveau au club  ? Alors n'hésite pas à aller te présenter dans le salon <#935798608396185641>.
        Tu veux organiser une montée à Vérel ? Rendez-vous dans <#935238034918621264>.
        Tu veux organiser une sortie un peu plus planifiée ? N'hésite pas à créer un salon dans la catégorie Planification de sorties !

        Si tu as besoin d'aide sur l'outil Discord, le salon <#935247724088021002> est fait pour toi.

        Enfin, retrouve tous les événements du club dans la catégorie Evénements calendriers et plein d'autres salons dans Vie du club.

        Bonnes discussions, et surtout bons vols !
      `
}
