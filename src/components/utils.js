

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
