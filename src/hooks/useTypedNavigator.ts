import { useNavigation } from "near-social-bridge";
import { NavigationProps } from "../routes/NavigationProps";

const useTypedNavigation = () => useNavigation<NavigationProps>();
export default useTypedNavigation;
