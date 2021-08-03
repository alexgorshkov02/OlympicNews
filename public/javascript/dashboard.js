async function dashboard() {
    const response = await fetch('/dashboard', {
      method: 'get'
    //   headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
      console.log("asdgdsgsd");
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#dashboard').addEventListener('click', dashboard);
  