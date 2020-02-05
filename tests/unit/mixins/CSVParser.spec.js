import Vue from 'vue';
import CSVParser from '@/mixins/CSVParser.js'

describe('CSVParser.js', () => {
  const vm = new Vue(CSVParser);

  it ('should have $_CSVParser_parse method', () => {
    expect(typeof CSVParser.methods.$_CSVParser_parse).toBe('function');
  })

  it ('should be able to parse CSV', () => {
    let csv = 'a,b,c\n1,2,3'; 
    expect(vm.$_CSVParser_parse(csv)).toEqual([ 
      ['a', 'b', 'c'],
      ['1', '2', '3']
    ]);
  });

  it ('should be able to handle row with delimiter', () => {
    let csv = '"a,",b,c\n1,2,3'; 
    expect(vm.$_CSVParser_parse(csv)).toEqual([ 
      ['a,', 'b', 'c'],
      ['1', '2', '3']
    ]);
  });

  it ('should not trim white space', () => {
    let csv = 'a,  b,c \n 1,2   ,3'; 
    expect(vm.$_CSVParser_parse(csv)).toEqual([ 
      ['a', '  b', 'c '],
      [' 1', '2   ', '3']
    ]);
  });

  it ('should not trim empty row', () => {
    let csv = 'a,b,c\n\n1,2,3'; 
    expect(vm.$_CSVParser_parse(csv)).toEqual([ 
      ['a', 'b', 'c'],
      [''],
      ['1', '2', '3']
    ]);
  });
})
