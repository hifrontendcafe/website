import { Card } from '../Card';

import { CMYK } from '../../lib/types';

type CMYKItemProps = {
  project: CMYK;
  index: number;
};

const CMYKItemCard: React.FC<CMYKItemProps> = ({ project }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Image
          src={project.image.src}
          alt={`Imagen del proyecto ${project.name}`}
          blurDataURL={project.image.src}
          width={400}
          height={200}
        />
        <Card.Title>{project.name}</Card.Title>
      </Card.Header>

      <Card.Body>
        <Card.Paragraph>{project.description}</Card.Paragraph>
      </Card.Body>

      <Card.Actions>
        <Card.PrimaryAction href={project.demo}>Demo</Card.PrimaryAction>
        <Card.SecondaryAction href={project.github}>
          GitHub
        </Card.SecondaryAction>
      </Card.Actions>
    </Card>
  );
};

export default CMYKItemCard;
