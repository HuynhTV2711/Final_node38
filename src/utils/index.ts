const initAvatar = (fullName: string) => {
  let name = fullName.split(' ');
  let newAvatar = name[0][0] + name[name.length - 1][0];
  return `https://ui-avatars.com/api/?name=${newAvatar}&background=random&size=100`;
};

export { initAvatar };
