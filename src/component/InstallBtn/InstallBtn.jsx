import React, { useRef, useEffect, useState } from 'react';
import styles from './InstallBtn.module.css';

const InstallBtn = () => {
  const [accept, setAccept] = useState(true);
  const btn = useRef();
  useEffect(() => {
    let deferredPrompt;
    const btnAdd = btn.current;
    window.addEventListener('beforeinstallprompt', e => {
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can add to home screen
      setAccept(false);
    });
    btnAdd.addEventListener('click', e => {
      if (deferredPrompt) {
        // hide our user interface that shows our A2HS button
        setAccept(true);
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      }
    });
  });
  return (
    <div className={accept ? styles.hide : styles.show}>
      <button className={styles.btn} ref={btn}>
        Install
      </button>
    </div>
  );
};

export default InstallBtn;
