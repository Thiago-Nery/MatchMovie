import { useState } from "react";
import { Row, Col, Card, Space, Rate, Modal, Button, Descriptions, Typography, Tag } from 'antd';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';

export default function MediaCard({media, mediaType}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const basePath = "https://api.themoviedb.org/3";
    const baseCoverPath = "https://image.tmdb.org/t/p/w500";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDA5MzViOTkyM2M5MGRjNzBkMTBlNGFlNmFmZDFiNSIsInN1YiI6IjY0YjliZWNjNGQyM2RkMDBjODE0MjMwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YJ3hq9ouwBqdPSGowrWy6OSh__Clwjbr00CnSBtLlk0",
      },
    };  

    const fetchModalData = (id, type) => {
        fetch(`${basePath}/${type}/${id}`, options)
        .then((response) => response.json())
        .then((media) => {
          console.log(media)
          if(mediaType !== "person")
          setModalData({
            mediaType: mediaType === "movie" ? "Filme" : "Série",
            cover: media.poster_path ?? media.profile_path,
            title: media.title ?? media.name,
            tagline: media.tagline,
            description: media.overview,
            genres: media.genres,
            language: media.original_language,
            popularity: media.popularity,
            productionCompanies: media.production_companies,
            productionCountries: media.production_countries,
            releaseDate: media.release_date ? new Date(media.release_date).toLocaleDateString('pt-BR') : "Não Informado",
            runtime: media.runtime,
            spokenLanguages: media.spoken_languages,
            status: media.status,
            voteAvarage: media.vote_average,
            voteCount: media.vote_count
          });
          else 
          setModalData({
            mediaType: "Pessoa",
            cover: media.profile_path,
            title: media.name,
            biography: media.biography,
            birthDay: media.birthday ? new Date(media.birthday).toLocaleDateString('pt-BR') : "Não Informado",
            placeOfBirth: media.place_of_birth
          });
        })
        .catch((err) => console.error(err));
      }
    

    const handleCardClick = (id, type) => {
        setIsModalOpen(true);
        fetchModalData(id, type);
    }
    

    return (
      <>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            key={media.id}
            hoverable
            style={{ width: 240, margin: 20 }}
            cover={
              <img
                alt={media.title}
                src={`${baseCoverPath}/${
                  media.poster_path ?? media.profile_path
                }`}
              />
            }
            onClick={() => handleCardClick(media.id, media.media_type)}
          >
            <Card.Meta
              title={media.title ?? media.name}
              description={media.description}
            />
            <div style={{ marginTop: 10 }}>
              <Row justify="space-between" align="middle">
                <Col span={24}>
                  <Space>
                    <EyeOutlined style={{ fontSize: 18 }} />
                    {media.popularity}
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <LikeOutlined style={{ fontSize: 18 }} />
                    {media.vote_average}
                  </Space>
                </Col>
                <Col>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={media.vote_average / 2}
                  />
                </Col>
              </Row>
              <Button type="primary" style={{ marginTop: 10, width: "100%" }}>
                Detalhes
              </Button>
            </div>
          </Card>
        </Col>
        <Modal
          title={
            <>
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                {modalData.title}
              </Typography.Title>
              {modalData.mediaType !== "Pessoa" && (
                <Typography.Text type="secondary">
                  {modalData.tagline}
                </Typography.Text>
              )}
            </>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Row gutter={[16, 16]}>
            <Col sm={12}>
              <img
                src={`${baseCoverPath}/${modalData.cover}`}
                alt="media_cover"
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col sm={12}>
              <Descriptions column={1} layout="vertical" size="small">
                {modalData.mediaType !== "Pessoa" ? (
                  <>
                    <Descriptions.Item label="Tipo">
                      {modalData.mediaType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      {modalData.status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gêneros">
                      <Row>
                        {modalData.genres?.map((genre) => (
                          <Col>
                            <Tag>{genre.name}</Tag>
                          </Col>
                        ))}
                      </Row>
                    </Descriptions.Item>
                    <Descriptions.Item label="Duração">
                      {modalData.runtime
                        ? `${modalData.runtime} min`
                        : "Não Informado"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Idiomas disponíveis">
                      <Row>
                        {modalData.spokenLanguages?.map((lang) => (
                          <Col>
                            <Tag>{lang.english_name}</Tag>
                          </Col>
                        ))}
                      </Row>
                    </Descriptions.Item>
                    <Descriptions.Item label="Data de lançamento">
                      {modalData.releaseDate}
                    </Descriptions.Item>
                  </>
                ) : (
                  <>
                    <Descriptions.Item label="Tipo">
                      {modalData.mediaType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Data de Nascimento">
                      {modalData.birthDay}
                    </Descriptions.Item>
                    <Descriptions.Item label="Local de Nascimento">
                      {modalData.placeOfBirth}
                    </Descriptions.Item>
                  </>
                )}
              </Descriptions>
            </Col>
            <Col span={24}>
              <span style={{ color: "#00000073" }}>
                {modalData.description ? "Descrição:" : "Biografia"}
              </span>
              <p>{modalData.description ?? modalData.biography}</p>
            </Col>
            {modalData.mediaType !== "Pessoa" && (
              <>
                <Col span={24}>
                  <Space.Compact block>
                    <Tag color="#87d068">
                      <EyeOutlined style={{ fontSize: 18 }} />
                      {modalData.popularity}
                    </Tag>
                    <Tag color="#108ee9">
                      <LikeOutlined style={{ fontSize: 18 }} />
                      {media.vote_average}
                    </Tag>
                  </Space.Compact>
                </Col>

                <Col>
                  <Descriptions column={1} layout="vertical">
                    <Descriptions.Item label="Produtoras">
                      <Row>
                        {modalData.productionCompanies?.map(
                          (productionCompanie) => (
                            <Col>
                              <Tag>{productionCompanie.name}</Tag>
                            </Col>
                          )
                        )}
                      </Row>
                    </Descriptions.Item>
                    <Descriptions.Item label="Produzido em">
                      <Row>
                        {modalData.productionCountries?.map(
                          (productionCountries) => (
                            <Col>
                              <Tag>{productionCountries.name}</Tag>
                            </Col>
                          )
                        )}
                      </Row>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </>
            )}
          </Row>
        </Modal>
      </>
    );
}