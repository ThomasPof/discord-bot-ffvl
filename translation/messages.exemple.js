// Licence module
module.exports.TRANSLATION_LICENCE = {
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
}