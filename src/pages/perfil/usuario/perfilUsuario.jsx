import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import exmedImage from "../../../assets/exmed.png";
import novacImage from "../../../assets/99pop.png";
import ladydriverImage from "../../../assets/ladydriver.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  ContainerHeader,
  ProfileSection,
  ProfileTitle,
  ProfileSubTitle,
  ProfileForm,
  Input,
  Button,
  FormGroup,
  Label,
  ProfileSidebar,
  SidebarItem,
  ProfileImageContainer,
  ProfileImage,
  ProfileImageWrapper,
  ProfileImageChangeButton,
  ProfileTabContent,
  SidebarUsarnameTitle,
  Modal,
  ModalContent,
  ModalButtonContainer,
  CancelButton,
  ConfirmButton,
  ErrorText,
  BalanceContainer,
  BalanceText,
  BalanceAmount,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  ProductUnits,
  RedeemButton,
} from "./perfilUsuarioStyle";

import { useUserData } from "../../../hooks/useUserData";
import { api } from "../../../services/api";
import { useUserType } from "../../../hooks/useUserType";

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("geral");
  const { userData, logout, fetchUserData } = useUserData();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userType } = useUserType();

  useEffect(() => {
    if (userType && userType !== "user") {
      alert("Você não tem permissão para acessar esta página.");
      navigate("/");
    }
  }, [userType, navigate]);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [dataState, setDataState] = useState({
    name: userData.name || "",
    socialName: userData.socialName || "",
    phoneNumber: userData.phoneNumber || "",
    dateOfBirth: userData.dateOfBirth || "",
    moedaCapiba: userData.moedaCapiba,
  });

  const handleUserUpdate = async (values) => {
    try {
      const response = await api.patch(`/user/${userData.id}`, {
        name: values.name,
        socialName: values.socialName,
        phoneNumber: values.phoneNumber,
        dateOfBirth: values.dateOfBirth,
      });

      if (response.status === 200) {
        fetchUserData();
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: dataState,
    validationSchema: Yup.object({
      name: Yup.string().required("Nome é obrigatório"),
      socialName: Yup.string().required("Nome social é obrigatório"),
      phoneNumber: Yup.string().required("Telefone é obrigatório"),
      dateOfBirth: Yup.date()
        .nullable()
        .required("Data de nascimento é obrigatória"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await handleUserUpdate(values);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogoutAccount = () => {
    try {
      logout();
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao desconectar:", error);
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const response = await api.delete("/user", {
        params: {
          id: userData.id,
        },
      });
      if (response.status === 204) {
        logout();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao deletar a conta:", error);
      alert(
        "Houve um erro ao tentar deletar a conta. Tente novamente mais tarde."
      );
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const produtos = [
    {
      id: 1,
      title: "Exmed Pass",
      description: "Clube de Saúde",
      price: 400,
      units: 29,
      image: exmedImage,
    },
    {
      id: 2,
      title: "99 Pop",
      description: "R$15,00 de crédito",
      price: 100,
      units: 325,
      image: novacImage,
    },
    {
      id: 3,
      title: "LadyDriver",
      description: "R$10,00 de crédito",
      price: 400,
      units: 128,
      image: ladydriverImage,
    },
  ];

  useEffect(() => {
    if (userData) {
      setDataState({
        name: userData.name,
        socialName: userData.socialName,
        phoneNumber: userData.phoneNumber,
        dateOfBirth: userData.dateOfBirth || "",
        moedaCapiba: userData.moedaCapiba,
      });
    }
  }, [userData]);

  const maskPhone = (value) => {
    const cleanValue = value.replace(/\D/g, "");

    if (cleanValue.length >= 11) {
      return cleanValue
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }

    return cleanValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  return (
    <Container>
      <ContainerHeader>
        <Header />
      </ContainerHeader>
      <ProfileSection>
        <ProfileSidebar>
          <SidebarUsarnameTitle>{userData.name}</SidebarUsarnameTitle>
          <SidebarItem
            isSelected={selectedTab === "geral"}
            onClick={() => handleTabClick("geral")}
          >
            Informações Gerais
          </SidebarItem>

          <SidebarItem
            isSelected={selectedTab === "seguranca"}
            onClick={() => handleTabClick("seguranca")}
          >
            Segurança
          </SidebarItem>
          <SidebarItem
            isSelected={selectedTab === "moedaCapiba"}
            onClick={() => handleTabClick("moedaCapiba")}
          >
            Moeda Capiba
          </SidebarItem>
          <SidebarItem
            isSelected={selectedTab === "sair"}
            onClick={openLogoutModal}
          >
            Sair
          </SidebarItem>
          <SidebarItem
            isSelected={selectedTab === "deletarConta"}
            onClick={openDeleteModal}
          >
            Deletar Conta
          </SidebarItem>
        </ProfileSidebar>

        <ProfileTabContent>
          <ProfileTitle>Dados do Usuário</ProfileTitle>
          <ProfileSubTitle>
            Preencha os campos abaixo para <strong>atualizar</strong> seus
            dados.
          </ProfileSubTitle>

          {selectedTab === "geral" && (
            <ProfileForm onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Nome</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  placeholder="Seu Nome"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <ErrorText>{formik.errors.name}</ErrorText>
                )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="socialName">Nome social</Label>
                <Input
                  type="text"
                  id="socialName"
                  name="socialName"
                  value={formik.values.socialName}
                  placeholder="Seu nome social"
                  {...formik.getFieldProps("socialName")}
                />
                {formik.touched.socialName && formik.errors.socialName && (
                  <ErrorText>{formik.errors.socialName}</ErrorText>
                )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phoneNumber">Telefone</Label>
                <Input
                  type="text"
                  id="phophoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  placeholder="Seu Telefone"
                  {...formik.getFieldProps("phoneNumber")}
                  onChange={(e) => {
                    const formattedPhone = maskPhone(e.target.value);
                    formik.setFieldValue("phoneNumber", formattedPhone);
                  }}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <ErrorText>{formik.errors.phoneNumber}</ErrorText>
                )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  {...formik.getFieldProps("dateOfBirth")}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <ErrorText>{formik.errors.dateOfBirth}</ErrorText>
                )}
              </FormGroup>
              <Button type="submit">Salvar</Button>
            </ProfileForm>
          )}

          {selectedTab === "seguranca" && (
            <Button
              onClick={() => {
                logout();
                navigate("/recuperar-senha");
                window.location.reload();
              }}
            >
              Alterar Senha
            </Button>
          )}

          {selectedTab === "moedaCapiba" && (
            <div>
              <BalanceContainer>
                <BalanceText>Saldo Atual:</BalanceText>
                <BalanceAmount>{userData.moedaCapiba} Capibas</BalanceAmount>
              </BalanceContainer>
              <ProductsGrid>
                {produtos.map((produto) => (
                  <ProductCard key={produto.id}>
                    <ProductImage src={produto.image} alt={produto.title} />
                    <ProductDetails>
                      <ProductTitle>{produto.title}</ProductTitle>
                      <ProductDescription>
                        {produto.description}
                      </ProductDescription>
                      <ProductPrice>{produto.price} Capibas</ProductPrice>
                      <ProductUnits>
                        {produto.units} unidades disponíveis
                      </ProductUnits>
                      <RedeemButton>Trocar</RedeemButton>
                    </ProductDetails>
                  </ProductCard>
                ))}
              </ProductsGrid>
            </div>
          )}
        </ProfileTabContent>
      </ProfileSection>

      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen}>
          <ModalContent>
            <h2>Você está prestes a deletar sua conta.</h2>
            <p>
              Tem certeza de que deseja deletar sua conta? Esta ação é
              irreversível.
            </p>
            <ModalButtonContainer>
              <CancelButton onClick={() => setIsDeleteModalOpen(false)}>
                Cancelar
              </CancelButton>
              <ConfirmButton onClick={confirmDeleteAccount}>
                Confirmar
              </ConfirmButton>
            </ModalButtonContainer>
          </ModalContent>
        </Modal>
      )}
      {isLogoutModalOpen && (
        <Modal isOpen={isLogoutModalOpen}>
          <ModalContent>
            <h2>Você está prestes a sair sua conta.</h2>
            <p>Tem certeza de que deseja sair sua conta?</p>
            <ModalButtonContainer>
              <CancelButton onClick={() => setIsLogoutModalOpen(false)}>
                Cancelar
              </CancelButton>
              <ConfirmButton onClick={confirmLogoutAccount}>
                Confirmar
              </ConfirmButton>
            </ModalButtonContainer>
          </ModalContent>
        </Modal>
      )}
      <Footer />
      {isSuccessModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Alteração Realizada</h2>
            <p>Seus dados foram atualizados com sucesso!</p>
            <ModalButtonContainer>
              <ConfirmButton onClick={() => setIsSuccessModalOpen(false)}>
                Fechar
              </ConfirmButton>
            </ModalButtonContainer>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default PerfilUsuario;
