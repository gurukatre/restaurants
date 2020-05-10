export default (() => {
    const form = document.querySelector('#locationForm');
    const location = document.querySelector('.location');
    
    // show form to add restaurant
    document.querySelector('#addLocation').addEventListener('click', () => {
        location.style.visibility = 'visible';
    });

    // on Cancel hide the form
    document.querySelector('#closeLocForm').addEventListener('click', () => {
        location.style.visibility = 'hidden';
    });


    document.querySelector('#submitLocForm').addEventListener('click', () => {
        db.collection('restoLocations').add({
            name: form.name.value,
            description: form.description.value,
            logo: form.logo.value,
            location: {
                lat: form.lat.value,
                long: form.lng.value
            }
        });
        form.name.value = '';
        form.description.value = '';
        form.logo.value = '';
        form.lat.value = '';
        form.lng.value = '';        
        location.style.visibility = 'hidden';
    });
})();


