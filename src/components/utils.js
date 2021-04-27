

export function toRadians(angle){
  return angle * (Math.PI / 180);
}

export function translate_str(x, y, rotation){
  return('translateX(' + x + 'px) translateY(' + y + 'px) rotate(' +
      rotation + 'deg)')
}

export function randint(min, max){
  return(Math.floor(Math.random()*(max-min))+min)
}

export function isin(outer_array, array){
//  check if an array is in outer_array
  return(outer_array.some(subarr => subarr.every((arr_elem, ind) => arr_elem == array[ind])))
}

export function whereis(outer_array, array){
//  return  bool array of matches of array in outer_array
  return(outer_array.map(subarr => subarr.every((arr_elem, ind) => arr_elem == array[ind])))
}