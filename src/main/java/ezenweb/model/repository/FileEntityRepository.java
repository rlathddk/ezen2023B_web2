package ezenweb.model.repository;

import ezenweb.model.entity.BoardImgEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileEntityRepository extends JpaRepository<BoardImgEntity, Integer> {
}
