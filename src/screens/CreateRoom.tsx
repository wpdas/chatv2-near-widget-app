import Container from "../components/Container";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { CreateRoomScreenProps } from "../routes/NavigationProps";

const CreateRoom: React.FC<CreateRoomScreenProps> = () => {
  return (
    <Container>
      <Header hideButtons />
      <Loading />
    </Container>
  );
};

export default CreateRoom;
