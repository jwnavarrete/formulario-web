// assets
import { IconHome, IconKey, IconWindmill, IconBrightness2, IconReport } from '@tabler/icons'

// constant
const icons = { IconHome, IconWindmill, IconKey, IconBrightness2, IconReport }

function BuildChild(data, currentChild) {
    //Creating current child object
    var child = {};
    child.id = currentChild.id;
    child.title = currentChild.titulo;
    child.type = currentChild.tipo;
    child.url = currentChild.url;
    child.icon = getIcono(currentChild.icono);
    child.breadcrumbs = false;
    child.children = [];

    //Looking for childrens in all input data
    var currentChildren = data.filter(item => item.parent_id == child.id);
    if (currentChildren.length > 0) {
        currentChildren.forEach(function (item) {
            //Iterating threw children and calling the recursive function
            //Adding the result to our current children
            child.children.push(BuildChild(data, item));
        });
    }
    return child;
}

const getIcono = (icon) => {
    switch (icon) {
        case "IconHome":
            return icons.IconHome
            break;

        case "IconWindmill":
            return icons.IconWindmill
            break;

        case "IconKey":
            return icons.IconKey
            break;

        case "IconBrightness2":
            return icons.IconBrightness2
            break;

        case "IconReport":
            return icons.IconReport
            break;

        default:
            // return icons.IconHome
            break;
    }
}

export { BuildChild } 