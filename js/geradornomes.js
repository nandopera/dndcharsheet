function gerarNomeMedieval(genero) {
    // Lista de prefixos e sufixos
    const prefixosMasculinos = ["Ae", "Al", "An", "Ar","Ba", "Be", "Ber", "Bi", "Bj", "Bo", "Br", "Bal", "Ber", "Ca", "Ce", "Ci", "Co", "Con", "Da", "De", "Di", "Do", "Du", "Ei", "En", "Er", "El", "Fa", "Fe", "Fi", "Fo", "Fr", "Fri", "Ga", "Ge", "Gi", "Go", "Gr", "Gar", "Ha", "He", "Hi", "Ho", "Hu", "Hel", "Ing", "Ia", "Il", "Im", "In", "Ir", "Is", "Ja", "Je", "Jo", "Ka", "Ke", "Ki", "Ko", "Kr", "Kon", "La", "Le", "Li", "Lo", "Lu", "Lan", "Ma", "Me", "Mi", "Mo", "Mu", "Mor", "Na", "Ne", "Ni", "No", "Nu", "Od", "Of", "Og", "Oh", "Oi", "On", "Op", "Or", "Os", "Ot", "Od", "Pa", "Pe", "Pi", "Po", "Pr", "Per", "Qu","Ra", "Re", "Ri", "Ro", "Ru", "Ran", "Sa", "Se", "Si", "So", "Su", "Sig", "Ta", "Te", "Ti", "To", "Tu", "Tor", "Ul", "Un", "Ur", "Ulf", "Va", "Ve", "Vi", "Vo", "Vu", "Wa", "We", "Wi", "Wo", "Wu", "Xa", "Xe", "Xi", "Xo", "Xu", "Wil", "Ya", "Ye", "Yi", "Yo", "Yu", "Za", "Ze", "Zi", "Zo", "Zu"];
    const sufixosMasculinos = ["ard", "bald", "bert", "brand", "gar", "mund", "ric", "ulf", "vald"];
  
    const prefixosFemininos = ["Aa", "Ae", "Ai", "An", "Ap", "Ar", "As", "At", "Au", "Av", "Ay", "Ba", "Be", "Bi", "Bo", "Br", "Ca", "Ce", "Ci", "Co", "Cr", "Da", "De", "Di", "Do", "Du", "Ea", "Ee", "Ei", "En", "Eo", "Er", "Es", "Et", "Eu", "Ev", "Ey", "Fa", "Fe", "Fi", "Fo", "Fr", "Ga", "Ge", "Gi", "Go", "Gr", "Ha", "He", "Hi", "Ho", "Hu", "Ia", "Ie", "Ii", "In", "Io", "Ir", "Is", "It", "Iu", "Iv", "Ja", "Je", "Ji", "Jo", "Ju", "Ka", "Ke", "Ki", "Ko", "Kr", "La", "Le", "Li", "Lo", "Lu", "Ma", "Me", "Mi", "Mo", "Mu", "Na", "Ne", "Ni", "No", "Nu", "Od", "Of", "Og", "Oh", "Oi", "On", "Op", "Or", "Os", "Ot", "Pa", "Pe", "Pi", "Po", "Pr", "Qu", "Ra", "Re", "Ri", "Ro", "Ru", "Sa", "Se", "Si", "So", "Su", "Ta", "Te", "Ti", "To", "Tu", "Ul", "Un", "Ur", "Va", "Ve", "Vi", "Vo", "Vu", "Wa", "We", "Wi", "Wo", "Wu", "Xa", "Xe", "Xi", "Xo", "Xu", "Ya", "Ye", "Yi", "Yo", "Yu", "Za", "Ze", "Zi", "Zo", "Zu", "Ael", "Ber", "El", "Fre", "Ger", "Hel", "Id", "Lia", "Mael", "Mor", "Ni", "Sig", "Thy", "Wil"];
    const sufixosFemininos = ["a", "e", "ia", "na", "ra", "sa"];
  
    // Gera nome aleatório
    let prefixo;
    let sufixo;
    if (genero === "feminino") {
      prefixo = prefixosMasculinos[Math.floor(Math.random() * prefixosMasculinos.length)];
      sufixo = sufixosMasculinos[Math.floor(Math.random() * sufixosMasculinos.length)];
    } else {
      prefixo = prefixosFemininos[Math.floor(Math.random() * prefixosFemininos.length)];
      sufixo = sufixosFemininos[Math.floor(Math.random() * sufixosFemininos.length)];
    }
  
    const nome = prefixo + sufixo;
  
    return nome;
  }
  
  // Exemplo de uso
  const genero = "masculino";
  const nome = gerarNomeMedieval(genero);
  
  console.log(`Nome gerado: ${nome}`);  