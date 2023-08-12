const getUserDate = (data) => {
  if (data != null || undefined || "") {
    const a = data.split(" ");
    console.log("a = " + a)
  
    const b = a[0].split(".");
    console.log("b = " + b)

    const d = b[0];
    const m = b[1];
    const y = b[2];

    const c = a[1].split(":");
    console.log("c = " + c)
    const h = c[0];
    const mm = c[1];

    console.log("date: " + d + " " + m + " " + y + " " + h + " " + mm)
  
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