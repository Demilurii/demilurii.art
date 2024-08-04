const zeroPad = (num, places) => String(num).padStart(places, '0')

function handleRigNewFrame(element){
    var parent_element = element.parentElement.parentElement;
    var rig_name = parent_element.getAttribute("data-name");
    var rig_frame = parent_element.querySelector("img");
    var max_frame_id = parseInt(element.max);
    var current_frame_id = Math.abs(parseInt(element.value));

    // Since the rigs rotate backwards, we need to flip the frame id
    current_frame_id = max_frame_id - current_frame_id;
    current_frame_id += 1;
    
    // Build the new image path
    var img = `/static/images/rigs/${rig_name}/${rig_name}-${zeroPad(current_frame_id, 2)}.png`;

    // Update the image path
    rig_frame.src = img;
}

document.addEventListener('DOMContentLoaded', function() {
    // Find all the rig rotator elements
    var rig_rotators = document.querySelectorAll(".rig-rotator");
    console.log(`Found ${rig_rotators.length} rig rotators`);

    // Loop through each rig rotator and preload the frames
    rig_rotators.forEach(function(rig_rotator) {
        var rig_name = rig_rotator.getAttribute("data-name");
        var frame_selector = rig_rotator.querySelector("input");
        var max_frame_id = parseInt(frame_selector.max);
        console.log(`Preloading frames for: ${rig_name}`);
        console.log(`Max frame id: ${max_frame_id}`);

        for (var i = 1; i <= max_frame_id; i++) {
            var img = new Image();
            img.src = `/static/images/rigs/${rig_name}/${rig_name}-${zeroPad(i, 2)}.png`;
            console.log(`Preloading: ${img.src}`);
        }
    });
});
