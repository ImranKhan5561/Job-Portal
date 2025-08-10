package com.jobportal.Repository;

import com.jobportal.entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends MongoRepository<Room, String> {
    Optional<Room> findByRoomId(String roomId);
    List<Room> findByUser1IdOrUser2Id(String userId1, String userId2);
}
