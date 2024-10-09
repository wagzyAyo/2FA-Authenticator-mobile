import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import About from "../screens/About";

const Drawer = createDrawerNavigator();

export default function MyDrawer(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="View codes" component={Home}/>
            <Drawer.Screen name="About" component={About}/>
        </Drawer.Navigator>
    )
}