    // Creating empty array to store only DNA sequences 
    let dnaArray = [];

fetch('rosalind_cons_1.txt')
  .then(response => response.text())
  .then(data => {
    // Do something with the data
    // Splitting to array with each ">Rosalind_xxxx\nABCD"
      let lines = data.split('>');

    // First element is ' ', so this is to delete it
      lines.shift();
    
    // Function to delete "Rosalind_XXXX" and all \n
      function deleteRosalind(str) {
       return str.slice(13).replaceAll('\n', '');
      }
    
      dnaArray = lines.map(deleteRosalind);

    console.log(dnaArray);

    // length of first DNA sequence which is same for all others
    const n = dnaArray[0].length;

  // creating arrays and assigning them 0 at each index
    let profileMatrix = {
      'A': Array(n).fill(0),
      'C': Array(n).fill(0),
      'G': Array(n).fill(0),
      'T': Array(n).fill(0)
    };
  
  // looping thru each array and each position of an character in array to fill in object with profile matrix
    for (let i = 0; i < dnaArray.length; i++) {
      let dna = dnaArray[i];
      for (let j = 0; j < dna.length; j++) {
        let nucleotide = dna.charAt(j);
        profileMatrix[nucleotide][j] += 1;
      }
    }

    console.log(profileMatrix);

  // formatting arrays to requested format in Rosalind
    let formattedA = profileMatrix['A'].toString().replaceAll(',', ' ');
    let formattedC = profileMatrix['C'].toString().replaceAll(',', ' ');
    let formattedG = profileMatrix['G'].toString().replaceAll(',', ' ');
    let formattedT = profileMatrix['T'].toString().replaceAll(',', ' ');

  // printing profileMatrix in requested format
    console.log('A: ' + formattedA + '\nC: ' + formattedC + '\nG: ' + formattedG + '\nT: ' + formattedT);

  // consensus
  let consensus = "";

  for (let j = 0; j < profileMatrix['A'].length; j++) {
    let maxCount = 0;
    let maxNucleotide = "";
    
    // Find the nucleotide with the highest count at this position
    for (let nucleotide of ['A', 'C', 'G', 'T']) {
      if (profileMatrix[nucleotide][j] > maxCount) {
        maxCount = profileMatrix[nucleotide][j];
        maxNucleotide = nucleotide;
      }
    }
    
    // Add the consensus nucleotide to the consensus sequence
    consensus += maxNucleotide;
  }
  
  console.log(consensus);
  

  })
  .catch(error => {
    console.error(error);
  }); 



// wyodrebnic same ciagi dna -> .split
// array jeden wielki, w srodku mniejsze arraye trzymajace lancuchy dna
// pętla na kadym mniejszym arrayu i gdzies odkladam (moze byc produktem funkcji)

/* https://www.samanthaming.com/tidbits/83-4-ways-to-convert-string-to-character-array/

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach */