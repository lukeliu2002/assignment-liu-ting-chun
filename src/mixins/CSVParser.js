export default {
	methods: {
    $_CSVParser_parse(strData, strDelimiter = ',') {
      let objPattern = new RegExp(
        (
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ), "gi");

      let arrData = [[]];
      let arrMatches = objPattern.exec(strData);

      while (arrMatches){
        let strMatchedDelimiter = arrMatches[ 1 ];

        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
          arrData.push( [] );
        }

        let strMatchedValue;

        if (arrMatches[ 2 ]){
          strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ), "\"");
        } 
        else {
          strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
        arrMatches = objPattern.exec(strData);
      }

      return( arrData );
		}
	}
}