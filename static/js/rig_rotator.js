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