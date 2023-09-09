const getUserDate = (data) => {
  if (data != null || undefined || "") {
    const a = data.split(" ");
  
    const b = a[0].split(".");

    const d = b[0];
    const m = b[1];
    const y = b[2];

    const c = a[1].split(":");
    const h = c[0];
    const mm = c[1];

  
    let userDate = new Date();

    userDate.setFullYear(y);
    userDate.setMonth(m - 1);
    userDate.setDate(d);
    userDate.setHours(h, mm);
    return userDate;}
    else {
      return undefined;
    }
  };


  export default getUserDate;