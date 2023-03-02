const facial_fields = {
    1: {
      Coloracion: {label:'coloracion', identifier:'Coloracion'},
      Grosor_piel: {label:'coloracion', identifier:'Grosor_piel'},
      Tacto: {label:'coloracion', identifier:'Tacto'},
      Brillo_piel: {label:'coloracion', identifier:'Brillo_piel'},
      Aspecto_poro: {label:'coloracion', identifier:'Aspecto_poro'},
      Grado_hidratacion: {label:'coloracion', identifier:'Grado_hidratacion'},
      Secreciones_sebaceas: {label:'coloracion', identifier:'Secreciones_sebaceas'},
      Alteraciones_secrecion: {label:'coloracion', identifier:'Alteraciones_secrecion'},
      Alteracion_pigmento: {label:'coloracion', identifier:'Alteracion_pigmento'},
      Alteracion_vacular: {label:'coloracion', identifier:'Alteracion_vacular'},
      Alteracion_vello: {label:'coloracion', identifier:'Alteracion_vello'},
      Tono_muscular: {label:'coloracion', identifier:'Tono_muscular'},
      Descamacion: {label:'coloracion', identifier:'Descamacion'},
      Arrugas: {label:'coloracion', identifier:'Arrugas'},
      Flacidez: {label:'coloracion', identifier:'Flacidez'},
      Bosas_palpebrales: {label:'coloracion', identifier:'Bosas_palpebrales'},
      Otras_alteraciones: {label:'coloracion', identifier:'Otras_alteraciones'},
  },
  };
 
    for (const key in facial_fields[1]) {
        console.log(facial_fields[1][key].identifier);
      }
  