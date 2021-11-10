function display_by_tag(tag) {
    // Declare variables
    const parent = document.getElementById('tags');
    const span = parent.getElementsByTagName('span');

    const target_parent = document.getElementById('wrapper');
    const target_figures = target_parent.getElementsByTagName('figure');

    // Loop through all spans items, and hide those who don't match the search query
    for (i = 0; i < span.length; i++) {
        if (span[i].className == tag) {
            console.log(tag);

            for (j = 0; j < target_figures.length; j++) {
                champion_tags = target_figures[j].className.split(' ');

                if (champion_tags.indexOf(tag) > -1) {
                    target_figures[j].style.display = "";
                }
                else {
                    target_figures[j].style.display = "none";
                }
            }
        }
    }
}
