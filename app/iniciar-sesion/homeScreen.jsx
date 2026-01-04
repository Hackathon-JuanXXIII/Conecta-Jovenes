import { StatusBar } from "expo-status-bar";
import React, { useCallback, useContext, useState } from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import AuthContext from "../contexts/authContext";
import { logout } from "../services/authService";

const places = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Parque XYZ, Alcorcón',
    dates: 'Lunes, 29 Diciembre',
    plan: 'Footing por XYZ hasta ABC',
    rating: 4.45,
    reviews: 124,
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Calle YZX, Alcorcón',
    dates: 'Apr 25 - May 5',
    plan: 'Taller de cerámica en WASD',
    rating: 4.81,
    reviews: 409,
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    name: 'Tucson, Arizona',
    dates: 'Apr 22 - May 4',
    plan: 'Footing por XYZ hasta ABC',
    rating: 4.3,
    reviews: 72,
  },
];

export default function HomeScreen() {
  const [saved, setSaved] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  
  const handleSave = useCallback(
    (id) => {
      if (saved.includes(id)) {
        setSaved(saved.filter(val => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved],
  );

  async function manejoLogout() {
    await logout();
    setUser(null);
  }

  return (
    <Container style={{ paddingTop: Platform.OS === "ios" ? 0 : 50, flex: 1 }}>
      <StatusBar style="auto" />
      
      <ContentContainer>
        <Header>
          <ActionWrapper>
            <MenuButton onPress={() => {}}>
              <Action>
                <IconText>☰</IconText>
              </Action>
            </MenuButton>

            <LogoutButton onPress={manejoLogout}>
              <Cerrar>
                <CerrarText>Cerrar sesión</CerrarText>
              </Cerrar>
            </LogoutButton>

            <EmptyButton onPress={() => {}}>
              <Action />
            </EmptyButton>
          </ActionWrapper>

          <Title>Bienvenido, {user?.nombre || 'USER'}</Title>

          <SearchContainer>
            <SearchInputWrapper>
              <InputWrapper>
                <Input placeholder="..." placeholderTextColor="#9eadba" />
                <InputIcon>
                  <IconText>🔍</IconText>
                </InputIcon>
              </InputWrapper>
            </SearchInputWrapper>

            <SearchButton onPress={() => {}}>
              <Btn>
                <BtnText>Buscar</BtnText>
              </Btn>
            </SearchButton>
          </SearchContainer>
        </Header>
        
        <ScrollViewContent>
          {places.map(({ id, img, name, dates, plan, rating, reviews }) => {
            const isSaved = saved.includes(id);
            return (
              <PlaceButton key={id} onPress={() => {}}>
                <Card>
                  <CardLikeWrapper>
                    <SaveButton onPress={() => handleSave(id)}>
                      <CardLike>
                        <HeartIcon isSaved={isSaved}>
                          {isSaved ? '❤' : '♡'}
                        </HeartIcon>
                      </CardLike>
                    </SaveButton>
                  </CardLikeWrapper>
                  
                  <CardTop>
                    <CardImg source={{ uri: img }} />
                  </CardTop>
                  
                  <CardBody>
                    <CardHeader>
                      <CardTitle>{name}</CardTitle>
                      <RatingContainer>
                        <StarIcon>⭐</StarIcon>
                        <CardStars>{rating}</CardStars>
                        <ReviewsText>({reviews} reviews)</ReviewsText>
                      </RatingContainer>
                    </CardHeader>
                    
                    <CardDates>{dates}</CardDates>
                    <CardPrice>
                      <PriceLabel>Descripción: </PriceLabel>
                      {plan}
                    </CardPrice>
                  </CardBody>
                </Card>
              </PlaceButton>
            );
          })}
        </ScrollViewContent>
      </ContentContainer>
    </Container>
  );
}

// Styled Components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  padding: 24px;
  padding-top: 10px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
`;

const Header = styled.View``;

const ActionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-horizontal: -8px;
`;

const MenuButton = styled.TouchableOpacity`
  margin-right: auto;
`;

const LogoutButton = styled.TouchableOpacity``;

const EmptyButton = styled.TouchableOpacity``;

const Action = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin-horizontal: 8px;
  background-color: #e8f0f9;
  align-items: center;
  justify-content: center;
`;

const Cerrar = styled.View`
  width: 110px;
  height: 48px;
  border-radius: 12px;
  margin-horizontal: 8px;
  background-color: #e8f0f9;
  align-items: center;
  justify-content: center;
`;

const IconText = styled.Text`
  font-size: 20px;
`;

const CerrarText = styled.Text`
  font-size: 15px;
  font-weight: 700;
`;

const Title = styled.Text`
  font-size: 27px;
  font-weight: 700;
  color: #222;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 25px;
`;

const SearchInputWrapper = styled.View`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  margin-right: 12px;
`;

const InputWrapper = styled.View`
  position: relative;
  width: 100%;
`;

const Input = styled.TextInput`
  height: 44px;
  background-color: #f0f6fb;
  padding-left: 44px;
  padding-right: 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #222;
`;

const InputIcon = styled.View`
  position: absolute;
  width: 44px;
  height: 44px;
  top: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const SearchButton = styled.TouchableOpacity``;

const Btn = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-width: 1px;
  background-color: #222;
  border-color: #222;
`;

const BtnText = styled.Text`
  font-size: 17px;
  line-height: 24px;
  font-weight: 600;
  color: #fff;
`;

const ScrollViewContent = styled.ScrollView`
  flex: 1;
  padding-bottom: 24px;
`;

const PlaceButton = styled.TouchableOpacity`
  margin-bottom: 16px;
`;

const Card = styled.View`
  position: relative;
  border-radius: 8px;
  background-color: #fff;
  shadow-color: rgba(0, 0, 0, 0.5);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.41px;
  elevation: 2;
`;

const CardLikeWrapper = styled.View`
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 12px;
`;

const SaveButton = styled.TouchableOpacity``;

const CardLike = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

// Para styled-components en JavaScript, necesitamos cambiar la sintaxis de la prop isSaved
const HeartIcon = styled.Text`
  font-size: 20px;
  color: ${props => props.isSaved ? '#ea266d' : 'inherit'};
`;

const CardTop = styled.View`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CardImg = styled.Image`
  width: 100%;
  height: 160px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CardBody = styled.View`
  padding: 12px;
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  fontWeight: 500;
  color: #232425;
  flex: 1;
  margin-right: 8px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StarIcon = styled.Text`
  font-size: 14px;
  margin-right: 4px;
`;

const CardStars = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #232425;
`;

const ReviewsText = styled.Text`
  color: #595a63;
  margin-left: 4px;
`;

const CardDates = styled.Text`
  font-size: 16px;
  color: #595a63;
`;

const CardPrice = styled.Text`
  margin-top: 6px;
  font-size: 16px;
  color: #232425;
`;

const PriceLabel = styled.Text`
  font-weight: 600;
`;