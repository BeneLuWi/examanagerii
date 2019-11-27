package com.examanagerii.user;

import java.util.Arrays;
import java.util.List;

public class Color {

    private String code;
    private List<String> codes;
    private String base;
    private String font;
    private String hover;


    public Color() {
        List<String> codes = Arrays.asList("#9c27b0", "#00ff00", "#0000ff", "#ff0000") ;
        this.setBase("w3-purple");
        this.setCode("#9c27b0");
        this.setCodes(codes);
        this.setFont("w3-white");
        this.setHover("w3-hover-white");

    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<String> getCodes() {
        return codes;
    }

    public void setCodes(List<String> codes) {
        this.codes = codes;
    }

    public String getBase() {
        return base;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public String getFont() {
        return font;
    }

    public void setFont(String font) {
        this.font = font;
    }

    public String getHover() {
        return hover;
    }

    public void setHover(String hover) {
        this.hover = hover;
    }
}