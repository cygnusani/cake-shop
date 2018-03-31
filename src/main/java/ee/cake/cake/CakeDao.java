package ee.cake.cake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class CakeDao {

    @Autowired
    private EntityManager em;

    public Cake findById(Long cakeId) {
        TypedQuery<Cake> query = em.createQuery("select c from Cake c where c.id = :id", Cake.class);
        return query.setParameter("id", cakeId).getSingleResult();
    }

    public List<Cake> findAvailableCakes() {
        TypedQuery<Cake> query = em.createQuery("select distinct c from Cake c where c.available = true", Cake.class);
        return query.getResultList();
    }

    public List<Cake> findAllCakes() {
        TypedQuery<Cake> query = em.createQuery("select distinct c from Cake c", Cake.class);
        return query.getResultList();
    }

    @Transactional
    public void insert(NewCakeJson json) {
        em.persist(new Cake(json.getName(), json.getPrice(), true));
    }

    @Transactional
    public void updateAvailability(Long cakeId, boolean availability) {
        TypedQuery<Cake> query = em.createQuery("select c from Cake c where c.id = :id", Cake.class);
        Cake temp = query.setParameter("id", cakeId).getSingleResult();
        temp.setAvailable(availability);
        em.merge(temp);
    }

}
