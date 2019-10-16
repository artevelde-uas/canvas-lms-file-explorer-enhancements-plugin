import './index.css';


export default function (app) {
    app.addRouteListener([
        'profile.files',
        'groups.files',
        'courses.files'
    ], () => {
        Promise.all([
            app.addReadyListener('.ef-header .ef-header__secondary > .ui-buttonset'),
            app.addReadyListener('.ef-main #selectAllCheckbox')
        ]).then(([buttons, selectAllCheckbox]) => {
            buttons.insertAdjacentHTML('afterbegin',
                `<button type="button" class="ui-button btn-select" title="Select all" data-tooltip="top" data-html-tooltip-title="Select all">
                     <i class="icon-check-mark"></i>
                 </button>`);
            
            buttons.querySelector('.btn-select').addEventListener('click', () => {
                selectAllCheckbox.click();
            });
        });
        
        app.addReadyListener('.ef-directory').then(directory => {
            // Disable click handler on label element 
            directory.addEventListener('click', event => {
                if (event.target.matches('label')) {
                    event.stopPropagation();
                }
            }, {
                useCapture: true
            });
        });
    });
}
