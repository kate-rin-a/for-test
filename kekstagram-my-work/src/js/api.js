const getData = (onSuccess) => {
    fetch('https://23.javascript.pages.academy/kekstagram/data',
)
        .then((response) => response.json())
        .then((comments) => { onSuccess(comments)})
        .catch((err) => console.error(err))
}

const sendData = (onSuccess, onFail, body) => {
    fetch(
      'https://23.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();          
        } else {
            onFail();
        }
      })
      .catch(() => {
        onFail();
      });
  };

export { getData, sendData }