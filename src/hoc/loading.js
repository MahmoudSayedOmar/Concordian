import { branch, renderComponent } from "recompose";
import Loading from "../Areas/Common/components/Loading";

const isLoading = ({ loading }) => loading;

export const withLoading = branch(isLoading, renderComponent(Loading));
