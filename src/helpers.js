const convertDuration = (duration) => {
  const sec = parseInt(duration, 10);
  const remain = sec%60;
  var minute = Math.floor(sec/60);
   if (sec < 0){return `no time`;}
   else if (remain <10){return `${minute}:0${remain}`;}
   else{ return `${minute}:${remain}`;}
};

const convertCreated = (created) =>{
  const age = new Date().valueOf() - new Date(created).valueOf();
  const year = Math.round((age / 1000) / (3600 * 24 * 365.25));
  const months = Math.round((age / 1000) / (3600 * 24 * 30));
  const weeks = Math.round((age / 1000) / (3600 * 24 * 7));
  const days = Math.round((age / 1000) / (3600 * 24));
  const hours = Math.round((age / 1000) / (3600));

  if (year >= 1){
      if (year === 1) return `Fyrir ${year} ári síðan`;
      return `Fyrir ${year} árum síðan`;
    }
    if (months >= 1) {
      if (months === 1) { return `Fyrir ${months} mánuði síðan`; }
      return `Fyrir ${months} mánuðum síðan`;
    }
    if (weeks >= 1) {
      if (weeks === 1) { return `Fyrir ${weeks} viku síðan`; }
      return `Fyrir ${weeks} vikum síðan`;
    }
    if (days >= 1) {
      if (days === 1) return `Fyrir ${days} degi síðan`;
      return `Fyrir ${days} dögum síðan`;
    }
    if (hours >= 1) {
      if (hours === 1) return `Fyrir ${hours} klukkustund síðan`;
      return `Fyrir ${hours} klukkustundum síðan`;
    }
  
    return age;
  };

exports.convertDuration = convertDuration;
exports.convertCreated = convertCreated;
