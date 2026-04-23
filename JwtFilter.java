package com.auction.controller;

import com.auction.model.AuctionItem;
import com.auction.model.Bid;
import com.auction.service.AuctionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auction")
@CrossOrigin
public class AuctionController {

    private final AuctionService service;

    public AuctionController(AuctionService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public AuctionItem create(@RequestBody AuctionItem item) {
        return service.createAuction(item);
    }

    @GetMapping("/all")
    public List<AuctionItem> getAll() {
        return service.getAllAuctions();
    }

    @PostMapping("/bid/{id}")
    public Bid placeBid(@PathVariable Long id, @RequestBody Bid bid) {
        return service.placeBid(id, bid);
    }



    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteAuction(id);
        return "Auction deleted successfully";
    }
}